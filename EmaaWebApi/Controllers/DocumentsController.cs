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

namespace EmaaWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly MyDBContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;

        public DocumentsController(MyDBContext context , IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
            _context = context;
        }

        // GET: api/Documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Documents>>> GetDocuments()
        {

            return await _context.Documents.Select(x => new Documents()
            {
                Contenu = x.Contenu,
                fullName = x.fullName,
                DocumentId = x.DocumentId,
                ImageName = x.ImageName,
                ImageSrc = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ImageName)

            }).ToListAsync();
        }

        // GET: api/Documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Documents>> GetDocuments(int id)
        {
            var documents = await _context.Documents.FindAsync(id);
            
            if (documents == null)
            {
                return NotFound();
            }

            return documents;
        }

        // PUT: api/Documents/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDocuments(int id, Documents documents)
        {
            if (id != documents.DocumentId)
            {
                return BadRequest();
            }

            _context.Entry(documents).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DocumentsExists(id))
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

        // POST: api/Documents
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Documents>> PostDocuments([FromForm] Documents doc)
        {

            doc.ImageName = await SaveImage(doc.ImageFile);

            _context.Documents.Add(doc);
            await _context.SaveChangesAsync();

            return StatusCode(201);


        }

        // DELETE: api/Documents/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Documents>> DeleteDocuments(int id)
        {
            var documents = await _context.Documents.FindAsync(id);
            if (documents == null)
            {
                return NotFound();
            }

            _context.Documents.Remove(documents);
            await _context.SaveChangesAsync();

            return documents;
        }

        private bool DocumentsExists(int id)
        {
            return _context.Documents.Any(e => e.DocumentId == id);
        }


        [NonAction]

        public async Task<string> SaveImage(IFormFile imageFile)
        {


            string wwwRootPath = _hostEnvironment.WebRootPath;
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);

            //  var imagePath = Path.Combine(wwwRootPath, "/Images/", imageName);
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
