using Recipe.Helpers;
using System.ComponentModel.DataAnnotations;

namespace Recipe.Models
{
    public class Ingredient:BaseClass<decimal>
    {
        [Required]
        public string? INGREDIENT_NAME { get; set; }
        [Required]
        public string? QUANTITY { get; set; }
        public decimal? RECIPE_ID { get; set; }
    }
}
