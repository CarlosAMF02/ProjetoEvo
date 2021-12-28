using System.ComponentModel.DataAnnotations;

namespace EvoApi.Models
{
    public class Funcionario
    {
        [Key]
        public int Id { get; set; }

        public string Nome { get; set; }
        public string Foto { get; set; }
        public string Rg {  get; set; }
        public int DepartamentoId { get; set; }
        public Departamento? Departamento { get; set; }

    }
}
