using System.ComponentModel.DataAnnotations;

namespace EvoApi.Models
{
    public class Funcionario
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MinLength(1, ErrorMessage = "Este campo deve conter entre 1 e 50 caracteres")]
        [MaxLength(50, ErrorMessage = "Este campo deve conter entre 1 e 50 caracteres")]
        public string Nome { get; set; }
        
        public string Foto { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MinLength(9, ErrorMessage = "Este campo deve conter 9 caracteres")]
        [MaxLength(9, ErrorMessage = "Este campo deve conter 9 caracteres")]
        public string Rg {  get; set; }

        public int DepartamentoId { get; set; }

        public Departamento? Departamento { get; set; }

    }
}
