using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly DataContext _context;
        public StudentsController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<ActionResult<StudentDTO>> Create(StudentDTO studentDTO)
        {
            var student = new Student 
            {
                StuName = studentDTO.stuName,
                StuGender = studentDTO.stuGender,
                StuAddress = studentDTO.stuAddress,
                StuContactNumber = studentDTO.stuContactNumber,
                StuDOB = studentDTO.stuDOB
            };

            _context.Students.Add(student);
            var result = await _context.SaveChangesAsync();

            if(result == 0) return BadRequest("Error occured!");

            return Ok();
        }

        [HttpGet("getAll")]
        public async Task<IEnumerable<StudentDTO>> GetAll()
        {
            var list = await _context.Students.Select(x => new StudentDTO
            {
                stuId = x.StuId,
                stuName = x.StuName,
                Gender = x.StuGender == "M" ? "Male" : "Female",
                stuAddress = x.StuAddress,
                stuContactNumber = x.StuContactNumber,
                DateOfBirth = x.StuDOB.ToString("dd-MMM-yyy")
            }).ToListAsync();

            return list;
        }

        [HttpGet("get-student/{id}")]
        public async Task<ActionResult<StudentDTO>> GetById(int id)
        {
            if (id == 0) return BadRequest("Id not found!");

            var student = await _context.Students.Select(x => new StudentDTO
            {
                stuId = x.StuId,
                stuName = x.StuName,
                stuGender = x.StuGender,
                stuAddress = x.StuAddress,
                stuContactNumber = x.StuContactNumber,
                stuDOB = x.StuDOB
            }).FirstAsync(x => x.stuId == id);

            if (student == null) return BadRequest("Student not found!");

            return student;
        }

        [HttpPut("update")]
        public async Task<ActionResult<StudentDTO>> Update(StudentDTO studentDTO)
        {
            var student = new Student 
            {
                StuId = studentDTO.stuId,
                StuName = studentDTO.stuName,
                StuGender = studentDTO.stuGender,
                StuAddress = studentDTO.stuAddress,
                StuContactNumber = studentDTO.stuContactNumber,
                StuDOB = studentDTO.stuDOB
            };

            _context.Entry(student).State = EntityState.Modified;
            var result = await _context.SaveChangesAsync();

            if(result == 0) return BadRequest("Error occured!");

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null) return BadRequest("Student not found!");

            _context.Students.Remove(student);
            var result = await _context.SaveChangesAsync();

            if(result == 0) return BadRequest("Error occured!");

            return true;
        }
    }
}