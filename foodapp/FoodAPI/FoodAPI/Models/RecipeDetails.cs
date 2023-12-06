namespace FoodAPI.Models
{
    public class RecipeDetails:Recipe
    {
        public RecipeImage recipe_image { get; set; }
        public int TotalIngredients { get; set; }
        public List<Ingredient> Ingredients { get; set; }

        public RecipeDetails()
        {
            Ingredients = new List<Ingredient>();
        }
    }
}
