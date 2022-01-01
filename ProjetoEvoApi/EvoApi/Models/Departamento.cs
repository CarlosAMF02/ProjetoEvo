using System.ComponentModel.DataAnnotations;

namespace EvoApi.Models
{
    public class Departamento
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MaxLength(50, ErrorMessage = "Este campo deve conter entre 1 e 50 caracteres")]
        [MinLength(1, ErrorMessage = "Este campo deve conter entre 1 e 50 caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MinLength(2, ErrorMessage = "Este campo deve conter 2 caracteres")]
        [MaxLength(2, ErrorMessage = "Este campo deve conter 2 caracteres")]
        public string Sigla { get; set; }
    }
}
