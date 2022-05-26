using AuthWebApi.Data;
using AuthWebApi.Dtos;
using AuthWebApi.Helpers;
using AuthWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult register(RegisterDto dto)
        {
            var user = new User
            {
                Email = dto.Email,
                CIN = dto.CIN,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Matricule = dto.Matricule,
                Prenom = dto.Name

            };

            return Created("success", _repository.Create(user));
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _repository.GetByEmail(dto.Email);
            if (user == null) return BadRequest(new { message = "Invalid Credentials" });
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }
            var jwt = _jwtService.Generate(user.CIN);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(new
            {
                message = "success",
                user = user
                //  jwt= jwt
            });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var UserId = token.Issuer;

                var user = _repository.GetByCIN(UserId);
                return Ok(user);
            }
            catch (Exception)
            {

                return Unauthorized();
            }
          

        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });
        }
    }


}
