using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealtorAPI.Models;
using RealtorAPI.Repository;

namespace RealtorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApatmentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Storage.Apartments);
        }
        [HttpGet("city")]
        public IActionResult GetByCity(string city)
        {
            return Ok(Storage.Apartments.FirstOrDefault(o=>o.City==city));
        }
        [HttpGet("price")]
        public IActionResult GetByPrice(double min, double max)
        {
            var data = (from a in Storage.Apartments
                        where a.Price>=min && a.Price<=max
                        select a).ToList();
            return Ok(data);
        }
        [HttpPost]
        public IActionResult Add(ApartmentDTO apartment)
        {
            try
            {
                Apartment newApartment = new Apartment()
                {
                    Id = Storage.Apartments.Count + 1,
                    City = apartment.City,
                    Beds = apartment.Beds,
                    Address = apartment.Address,
                    Price = apartment.Price
                };
                Storage.Apartments.Add(newApartment);
                return Ok(newApartment);
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var data=Storage.Apartments.FirstOrDefault(x => x.Id == id);
                Storage.Apartments.Remove(data);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }
        }
        [HttpPatch]
        public IActionResult UpdatePrice(int id, double price)
        {
            try
            {
                var data = Storage.Apartments.FirstOrDefault(x => x.Id == id);
                data.Price=price;
                return Ok(data);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
