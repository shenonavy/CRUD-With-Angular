using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Student
    {
        [Key]
        public int StuId { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(50)]
        public string StuName { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(1)]
        public string StuGender { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string StuAddress { get; set; }

        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(20)]
        public string StuContactNumber { get; set; }

        [Required]
        public DateTime StuDOB { get; set; }
    }
}