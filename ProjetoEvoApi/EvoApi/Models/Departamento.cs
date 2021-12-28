using System.ComponentModel.DataAnnotations;

namespace EvoApi.Models
{
    public class Departamento
    {
        [Key]
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Sigla { get; set; }
    }
}
