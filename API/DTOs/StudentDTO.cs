using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class StudentDTO
    {
        public int stuId { get; set; }

        [Required]
        [Display(Name = "Name")]
        public string stuName { get; set; }

        [Required]
        [Display(Name = "Gender")]
        public string stuGender { get; set; }

        [Required]
        [Display(Name = "Address")]
        [StringLength(maximumLength: 50, MinimumLength = 5)]
        public string stuAddress { get; set; }

        [Required]
        [Display(Name = "Contact Number")]
        [StringLength(maximumLength: 15, MinimumLength = 5)]
        public string stuContactNumber { get; set; }

        [Required]
        [Display(Name = "DOB")]
        public DateTime stuDOB { get; set; }

        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
    }
}