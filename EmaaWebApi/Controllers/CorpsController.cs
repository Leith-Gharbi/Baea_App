using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmaaWebApi.Models;
using EmaaWebApi.Models.DBContexts;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Cors;

namespace EmaaWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CorpsController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public CorpsController(MyDBContext context, IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;

        }

        // GET: api/Corps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Corps>>> GetCorps()
        {

            return await _context.Corps.Select(x => new Corps()
            {
                CorpsId = x.CorpsId,
                BaseID=x.BaseID,
                fullName = x.fullName,
                shortName = x.shortName,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)

            }).ToListAsync();


        }


        // GET: api/ListCorps
         [HttpGet]
        [Route("GetListCorps")]
        public async Task<ActionResult<IEnumerable<Corps>>> GetListCorps(int id)
        {
            var queryListCorps = from x in _context.Corps
                                 where x.BaseID == id
                                 select new Corps()
                                 {
                                     CorpsId = x.CorpsId,
                                     BaseID = x.BaseID,
                                     fullName = x.fullName,
                                     shortName = x.shortName,
                                     ImageName = x.ImageName,
                                     ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)
                                 };




            return await queryListCorps.ToListAsync();



        }





        // GET: api/Corps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Corps>> GetCorps(int id)
        {
            var corps = await _context.Corps.FindAsync(id);

            if (corps == null)
            {
                return NotFound();
            }

            return corps;
        }

        // PUT: api/Corps/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCorps(int id, [FromForm]  Corps corps)
        {
            if (id != corps.CorpsId)
            {
                return BadRequest();
            }


            var CorpsToEdit = _context.Corps.Find(id);
            CorpsToEdit.fullName = corps.fullName;
            CorpsToEdit.shortName = corps.shortName;
            if (CorpsToEdit.ImageFile != null)
            {
                CorpsToEdit.ImageName = await SaveImage(corps.ImageFile);
               
            }
            _context.Entry(CorpsToEdit).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CorpsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();

        }

        // POST: api/Corps
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Corps>> PostCorps([FromForm] Corps corps)
        {
            corps.ImageName = await SaveImage(corps.ImageFile);


            _context.Corps.Add(corps);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Corps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Corps>> DeleteCorps(int id)
        {
            var corps = await _context.Corps.FindAsync(id);
            if (corps == null)
            {
                return NotFound();
            }

            _context.Corps.Remove(corps);
            await _context.SaveChangesAsync();

            return corps;
        }

        private bool CorpsExists(int id)
        {
            return _context.Corps.Any(e => e.CorpsId == id);
        }


        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            //var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);

            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
