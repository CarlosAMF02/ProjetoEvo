using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EvoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EvoApi.Controllers
{
    [Route("evo/[controller]")]
    [ApiController]
    public class DepartamentoController : Controller
    {
        private readonly DataContext _context;

        public DepartamentoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Departamento>>> Get()
        {
            return Ok(await _context.Departamentos.ToListAsync());
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Departamento>> Get(int id)
        {
            var dep = await _context.Departamentos.FindAsync(id);
            if(dep == null)
            {
                return BadRequest("Departamento not found");
            }
            return Ok(dep);
        }

        [HttpPost]
        public async Task<ActionResult<List<Departamento>>> AddDepartamento(Departamento departamento)
        {
            _context.Departamentos.Add(departamento);
            await _context.SaveChangesAsync();
            return Ok(await _context.Departamentos.ToListAsync());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<List<Departamento>>> UpdateDepartamento(Departamento departamento, int id)
        {
            var dbDep = await _context.Departamentos.FindAsync(id);
            if (dbDep == null)
            {
                return BadRequest("Departamento not found");
            }
            dbDep.Nome = departamento.Nome;
            dbDep.Sigla = departamento.Sigla;

            await _context.SaveChangesAsync();

            return Ok(await _context.Departamentos.ToListAsync());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<List<Departamento>>> DeleteDepartamento(int id)
        {

            var dbDep = await _context.Departamentos.FindAsync(id);
            if (dbDep == null)
            {
                return BadRequest("Departamento not found");
            }
            _context.Departamentos.Remove(dbDep);
            await _context.SaveChangesAsync();

            return Ok(await _context.Departamentos.ToListAsync());
        }

    }
}
