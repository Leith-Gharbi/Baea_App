using AuthWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWebApi.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly UserContext _context;

        public UserRepository(UserContext context)
        {
            _context = context;
        }
        public User Create(User user)
        {
            _context.Users.Add(user);
            user.CIN = _context.SaveChanges().ToString();
            return user;
        }

        public User GetByCIN(string Cin)
        {
            return _context.Users.FirstOrDefault(u => u.CIN == Cin);
        }

        public User GetByEmail(string email)
        {
            return _context.Users.FirstOrDefault(u => u.Email == email);
        }
    }
}
