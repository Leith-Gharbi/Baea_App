using DevExpress.XtraPrinting;
using DevExpress.XtraReports.UI;
using EmaaWebApi.Models;
using EmaaWebApi.Reports;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace EmaaWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {



        [HttpGet("GetPld/{FileType}")]
        public ActionResult GetPld(string FileType)
        {
            Rpt_Pld fiche = new Rpt_Pld();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "."+ FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }

        [HttpGet("GetChangementStatus/{FileType}")]
        public ActionResult GetChangementStatus(string FileType)
        {
           RptchangementStatus fiche = new RptchangementStatus();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }

        [HttpGet("GetDemandeTraveau/{FileType}")]
        public ActionResult GetDemandeTraveau(string FileType)
        {
            RptDemandeTraveau fiche = new RptDemandeTraveau();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }

        [HttpGet("GetFicheDiscours/{FileType}")]
        public ActionResult GetFicheDiscours(string FileType)
        {
            RptFicheDiscours fiche = new RptFicheDiscours();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }


        [HttpGet("GetPldVoyage/{FileType}")]
        public ActionResult GetPldVoyage(string FileType)
        {
            RptPldVoyage fiche = new RptPldVoyage();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }


        [HttpGet("GetRenouvelementContrat/{FileType}")]
        public ActionResult GetRenouvelementContrat(string FileType)
        {
            RptRenouvelementContrat fiche = new RptRenouvelementContrat();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }

        [HttpGet("GetPunitions/{FileType}")]
        public ActionResult GetPunitions(string FileType)
        {
            Rpt_punition fiche = new Rpt_punition();
            var stream = new MemoryStream();
            // return File(stream.GetBuffer(), "application/pdf");

            string contentType = "";
            string extension = "." + FileType;

            switch (extension)
            {
                case ".pdf":
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                case ".xslx":
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    fiche.ExportToXlsx(stream);
                    break;
                case ".docx":
                    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    fiche.ExportToDocx(stream);
                    break;
                // and so on
                default:
                    contentType = "application/pdf";
                    fiche.ExportToPdf(stream);
                    break;
                    // throw new ArgumentOutOfRangeException($"Unable to find Content Type for file name {file.NameWithExtension}.");
            }

            return File(stream.GetBuffer(), contentType);
        }


        [HttpGet("GetPunition")]
        public ActionResult GetPunition()
        {
            //Rpt_punition fiche = new Rpt_punition();
            //var stream = new MemoryStream();
            //fiche.ExportToPdf(stream);
            //return File(stream.GetBuffer(), "application/pdf");
            ExportModel model = new ExportModel();
            model.Format = "docx";
            XtraReport report = new Rpt_Pld();
            string fileName = String.Format("Report.{0}", model.Format);

            using (MemoryStream ms = new MemoryStream())
            {
                switch (model.Format)
                {
                    case "pdf":
                        report.ExportToPdf(ms);
                        break;
                    case "docx":
                        report.ExportToDocx(ms);
                        break;
                    case "xls":
                        report.ExportToXls(ms);
                        break;
                    case "xlsx":
                        report.ExportToXlsx(ms);
                        break;
                    case "rtf":
                        report.ExportToRtf(ms);
                        break;
                    case "mht":
                        report.ExportToMht(ms);
                        break;
                    case "html":
                        report.ExportToHtml(ms);
                        break;
                    case "txt":
                        report.ExportToText(ms);
                        break;
                    case "csv":
                        report.ExportToCsv(ms);
                        break;
                    case "png":
                        report.ExportToImage(ms, new ImageExportOptions() { Format = System.Drawing.Imaging.ImageFormat.Png });
                        break;
                }

                // return File(ms.ToArray(), model.Format, "Report.pdf", false);
                return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "Report.docx", false);
            }
        }











        [HttpPost]
        public ActionResult Export(ExportModel model)
        {
            XtraReport report = new Rpt_Pld();
            string fileName = String.Format("Report.{0}", model.Format);

            using (MemoryStream ms = new MemoryStream())
            {
                switch (model.Format)
                {
                    case "pdf":
                        report.ExportToPdf(ms);
                        break;
                    case "docx":
                        report.ExportToDocx(ms);
                        break;
                    case "xls":
                        report.ExportToXls(ms);
                        break;
                    case "xlsx":
                        report.ExportToXlsx(ms);
                        break;
                    case "rtf":
                        report.ExportToRtf(ms);
                        break;
                    case "mht":
                        report.ExportToMht(ms);
                        break;
                    case "html":
                        report.ExportToHtml(ms);
                        break;
                    case "txt":
                        report.ExportToText(ms);
                        break;
                    case "csv":
                        report.ExportToCsv(ms);
                        break;
                    case "png":
                        report.ExportToImage(ms, new ImageExportOptions() { Format = System.Drawing.Imaging.ImageFormat.Png });
                        break;
                }

                return File(ms.ToArray(), model.Format, fileName, false);
            }
        }


        // the HTTP post request. The Body size limit is disabled 
        [HttpPost("Upload"), DisableRequestSizeLimit]
       // [ActionName("Upload")]
        public IActionResult UploadFile([FromForm] RptFiles rptFiles)
        {
            try
            {
                // 1. get the file form the request

               // var postedFile = Request.Form.Files[0];

                var postedFile = rptFiles.UploadedFile;
                var nameToSave = rptFiles.filename;
                // 2. set the file uploaded folder
                var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
                // 3. check for the file length, if it is more than 0 the save it
                if (postedFile.Length > 0)
                {
                    // 3a. read the file name of the received file
                    var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition)
                        .FileName.Trim('"');
                    // 3b. save the file on Path

                   var  DestinationFileName = nameToSave  + Path.GetExtension(postedFile.FileName);
                    var finalPath = Path.Combine(uploadFolder, DestinationFileName);
                    using (var fileStream = new FileStream(finalPath, FileMode.Create))
                    {
                        postedFile.CopyTo(fileStream);
                    }
                    return Ok($"File is uploaded Successfully");
                }
                else
                {
                    return BadRequest("The File is not received.");
                }


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Some Error Occcured while uploading File {ex.ToString()}");
            }
        }


        [HttpPost("Delete_File")]
        //[ValidateAntiForgeryToken]
        public IActionResult Delete_File(string file)
        {
            try
            {

                string fileDirectory = Path.Combine(
                          Directory.GetCurrentDirectory(), "wwwroot/uploaded/bus/");


                var fullPathforRemoving = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles", file);


                if (System.IO.File.Exists(fullPathforRemoving))
                {
                    System.IO.File.Delete(fullPathforRemoving);
                    return Ok($"File is Deleted Successfully");

                }
                else
                {
                    return Ok($"File not Existing path={fullPathforRemoving} ");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Some Error Occcured while uploading File {ex.ToString()}");
            }

        }



        [HttpGet("GetFiles")]
        public IEnumerable<FilePath> GetFiles()
        {
            List<FilePath> files = new List<FilePath>();
            DirectoryInfo dirInfo = new DirectoryInfo(@"C:\inetpub\wwwroot\EmaaWebApi\UploadedFiles\");

            foreach (FileInfo fInfo in dirInfo.GetFiles())
            {
                var fullName = fInfo.Name.Split('.');

                files.Add(new FilePath() { path = @"\Photos\3\" + fInfo.Name , filename = fInfo.Name , name= fullName[0] });
            }

            return files.ToList();
        }



        [HttpGet("Download/{filename}")]
        public async Task<IActionResult> Download(string filename)
        {
            if (filename == null)
                return Content("filename not present");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "UploadedFiles", filename);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
        {
            {".txt", "text/plain"},
            {".pdf", "application/pdf"},
            {".doc", "application/vnd.ms-word"},
            {".docx", "application/vnd.ms-word"},
            {".xls", "application/vnd.ms-excel"},
            {".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},  
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }




    }



    public class FilePath
    {

        public string path { get; set; }
        public string filename { get; set; }
        public string name { get; set; }
    }


    public class RptFiles
    {
        public IFormFile UploadedFile { get; set; }
        public string filename { get; set; }

    }
}
