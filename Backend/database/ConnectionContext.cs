using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;

namespace ConnectionPoint;
public class ConnectionContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder build)
    {
        build.UseNpgsql(@$"
        Host=db.tvujkqvhrasefceilzao.supabase.co;
        Database=SurveyProject;
        Port=5432;
        Username=postgres;
        Password=12212004111955bA$;
        ");
    }
    public DbSet<Users> Users { get; set; } = null!;
    public DbSet<Questions> Questions { get; set; } = null!;
    public DbSet<Answers> Answers { get; set; } = null!;
}
[Index("UserName", IsUnique = true)]
[Index("Email", IsUnique = true)]
public class Users
{
    [Key]
    public int User_Id { get; set; }
    public String UserName { get; set; } = null!;
    public String Email { get; set; } = null!;
    public String Password { get; set; } = null!;
    public DateTime Date { get; set; } = DateTime.UtcNow;

    public override String ToString() => @$"
            User_Id: {User_Id}
        UserName: {UserName}
        Password: {Password}
        Date: {Date}
    ";
}
public class Questions
{
    [Key]
    public int Q_Id { get; set; }
    [ForeignKey("Users")]
    public int User_Id { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    public String Question { get; set; } = null!;
    public override String ToString() => @$"
        Q_Id: {Q_Id}
        Question: {Question}
        User_Id: {User_Id}
    ";
}
public class Answers
{
    [Key]
    public int Values_ID { get; set; }
    [ForeignKey("Questions")]
    public int Q_Id { get; set; }
    public String Values { get; set; } = null!;
}
public class JointHandler
{
    public int? Q_Id { get; set; }
    public int? User_Id { get; set; }
    public string? Question { get; set; }
    public string? UserName { get; set; }
    public string? Password { get; set; }
    public DateOnly? Date { get; set; }
    public string? Values { get; set; }
    public override String ToString()
    {
        return
        @$"
        Q_Id: {Q_Id}
        Question: {Question}
        User_Id: {User_Id}
        UserName: {UserName}
        Password: {Password}
        Date: {Date}
        Values: {Values}
        ";
    }
}
/*
var db = new ConnectionContext();
        db.Database.EnsureCreated();
        var obj = new JointHandler();
        var obj1 = db.Users.Join(db.Questions,
        (user) => user.User_Id,
        (question) => question.User_Id,
         (U, Q) => new
         {
             User = U,
             Question = Q
         }
        ).ToList();
        System.Console.WriteLine(obj1[0].User.ToString());
        System.Console.WriteLine(obj1[0].Question.ToString());
        //    equals
        //    select
        System.Console.WriteLine("Hola mundo");
*/