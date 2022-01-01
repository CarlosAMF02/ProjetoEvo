using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EvoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EvoApi.Controllers
{
    [Route("evo/[controller]")]
    [ApiController]
    public class FuncionarioController : Controller
    {
        private readonly DataContext _context;

        public FuncionarioController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Funcionario>>> Get()
        {
            return Ok(await _context.Funcionarios.ToListAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Funcionario>> Get(int id)
        {
            var func = await _context.Funcionarios.Include(x => x.Departamento).AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (func == null)
            {
                return BadRequest("Funcionario not found");
            }
            return Ok(func);
        }

        [HttpGet]
        [Route("departamento/{id:int}")]
        public async Task<ActionResult<List<Funcionario>>> GetByDepartamento([FromServices] DataContext context, int id)
        {
            var func = await context.Funcionarios.Include(x => x.Departamento).Where(x => x.DepartamentoId == id).ToListAsync();
            return func;
        }

        [HttpPost]
        public async Task<ActionResult<List<Funcionario>>> AddFuncionario(Funcionario funcionario)
        {
            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();
            return Ok(await _context.Funcionarios.ToListAsync());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<List<Funcionario>>> UpdateFuncionario(Funcionario funcionario, int id)
        {
            var dbFunc = await _context.Funcionarios.FindAsync(id);
            if (dbFunc == null)
            {
                return BadRequest("Funcionario not found");
            }
            dbFunc.Nome = funcionario.Nome;
            dbFunc.Rg = funcionario.Rg;
            dbFunc.DepartamentoId = funcionario.DepartamentoId;
            dbFunc.Foto = funcionario.Foto;
            dbFunc.Departamento = funcionario.Departamento;

            await _context.SaveChangesAsync();

            return Ok(await _context.Funcionarios.ToListAsync());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<List<Funcionario>>> DeleteFuncionario(int id)
        {

            var dbFunc = await _context.Funcionarios.FindAsync(id);
            if (dbFunc == null)
            {
                return BadRequest("Funcionario not found");
            }
            _context.Funcionarios.Remove(dbFunc);
            await _context.SaveChangesAsync();

            return Ok(await _context.Funcionarios.ToListAsync());
        }
    }
}
