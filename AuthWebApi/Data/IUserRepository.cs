using AuthWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWebApi.Data
{
  public  interface IUserRepository
    {
        User Create(User user);
        User GetByEmail(string email);
        User GetByCIN(string id);
    }
}
