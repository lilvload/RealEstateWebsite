using RealtorAPI.Models;

namespace RealtorAPI.Repository;

public class Storage
{
    public static List<Apartment> Apartments = new List<Apartment>
    {
        new Apartment{Id=1, City="Kyiv",Beds=2,Address="zhytomyrska 10",Price=1500}
    };
}
