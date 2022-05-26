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
  //  [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class BasesController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public BasesController(MyDBContext context ,IWebHostEnvironment hostEnvironment)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
        }

        // GET: api/Bases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Base>>> GetBases()
        {
            return await _context.Bases.Select(x => new Base() {
                BaseID = x.BaseID,
                fullName = x.fullName,
                shortName = x.shortName,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}",Request.Scheme, Request.Host, Request.PathBase,x.ImageName)

            }).ToListAsync();
        }

        // GET: api/Bases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Base>> GetBase(int id)
        {
            var @base = await _context.Bases.FindAsync(id);

            if (@base == null)
            {
                return NotFound();
            }

            return @base;
        }

        // PUT: api/Bases/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBase(int id, [FromForm]Base @base)
        {
            if (id != @base.BaseID)
            {
                return BadRequest();
            }

            try
            {
                var  BaseToEdit = _context.Bases.Find(id);
            BaseToEdit.fullName = @base.fullName;
            BaseToEdit.shortName = @base.shortName;
            if (@base.ImageFile != null)
            {
                BaseToEdit.ImageName = await SaveImage(@base.ImageFile);

            }
                      _context.Entry(BaseToEdit).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return Ok(@base);
                }
            }

            return NoContent();
        }

        // POST: api/Bases
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Base>> PostBase([FromForm]Base @base)
        {
            @base.ImageName = await SaveImage(@base.ImageFile);
            
            _context.Bases.Add(@base);
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        // DELETE: api/Bases/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Base>> DeleteBase(int id)
        {
            try
            {
                var @base = await _context.Bases.FindAsync(id);
                if (@base == null)
                {
                    return NotFound();
                }
                _context.Bases.Remove(@base);
                await _context.SaveChangesAsync();

                return @base;
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
          
        }

        private bool BaseExists(int id)
        {
            return _context.Bases.Any(e => e.BaseID == id);
        }

        [NonAction]
        public async Task<string> SaveImage (IFormFile imageFile)
        {


            string wwwRootPath = _hostEnvironment.WebRootPath;
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

          //  var imagePath = Path.Combine(wwwRootPath, "/Images/", imageName);
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);

            using (var fileStream = new FileStream(imagePath,FileMode.Create))
            {
               await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

    }
}
