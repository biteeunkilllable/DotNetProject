using System.Data.Common;
using ConnectionPoint;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft;
using Newtonsoft.Json;

namespace MainNamespace;
public class MainClass
{
    public static void Main()
    {
        var builder = WebApplication.CreateBuilder();
        builder.Services.AddControllers();
        var app = builder.Build();
        new ConnectionContext().Database.EnsureCreated();
        app.MapControllers();
        app.UseCors(builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
        app.MapGet("/", () => { return "Hola Mundo"; });
        app.Run();
        System.Console.WriteLine("Hola Mundo");
    }
}
[ApiController]
[Route("[Controller]/[Action]")]
public class route : ControllerBase
{

    public IActionResult Sumbiton([FromBody] Questions obj)
    {
        try
        {
            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            db.Questions.Add(obj);
            var InsertedObject = db.Questions.OrderByDescending(a => a.Q_Id).FirstOrDefault();
            db.SaveChanges();
            return Ok(InsertedObject.Q_Id + 1);
        }
        catch (Exception e) { return StatusCode(500, "An internal server error occurred.\n\n" + e); }
    }
    public IActionResult GetQuestions(int Q_Id)
    {
        try
        {
            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            var res = db.Questions.Select(a => a).Where(a => a.Q_Id == Q_Id).Select(a => new
            {
                Question = a.Question,
                Q_Id = a.Q_Id
            });
            return Ok(res);
        }
        catch (Exception e) { return StatusCode(500, "An internal server error occurred.\n\n" + e); }
    }
    public IActionResult SaveSubmit([FromBody] Answers Result)
    {
        Console.Beep();
        try
        {
            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            db.Answers.Add(Result);
            db.SaveChanges();
            return Ok("Succesfull");
        }
        catch (Exception e) { return StatusCode(500, "An internal server error occurred.\n\n" + e); }
    }
    [HttpPost]
    public IActionResult NewUser([FromBody] Users user)
    {
        Console.Beep();
        try
        {
            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            db.Users.Add(user);
            db.SaveChanges();
            return Ok("Succesfull");
        }
        catch (Exception e) { return StatusCode(500, JsonConvert.SerializeObject(e)); }
    }
    public IActionResult CheckUser([FromBody] UserChecker Check)
    {
        Console.Beep();
        try
        {
            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            var Checking = db.Users
            .Select(a => a)
            .Where(a => a.Email == Check.Email || a.UserName == Check.UserName)
            .Where(a => a.Password == Check.Password).ToList();
            if (Convert.ToBoolean(Checking.Count))
            {
                var response = new { auth = "true", User_Id = Checking[0].User_Id };
                return Ok(JsonConvert.SerializeObject(response));
            }
            else
                return StatusCode(400, "false");
        }
        catch (Exception e) { return StatusCode(500, "An internal server error occurred.\n\n" + e); }
    }
    public IActionResult DashBoardData(String Id)
    {
        Console.Beep();
        try
        {

            var db = new ConnectionContext();
            db.Database.EnsureCreated();
            var UserName = db.Users.FirstOrDefault(a => a.User_Id == Convert.ToInt16(Id));
            var UserQuestionJoint =
            db.Users.Join(db.Questions,
        (user) => user.User_Id,
        (question) => question.User_Id,
         (U, Q) => new
         {
             Date = Q.DateCreated,
             User_Id = U.User_Id,
             Q_Id = Q.Q_Id,
         })
            .Where(a => a.User_Id == Convert.ToInt16(Id))
            .Select(a => new { Q_Id = a.Q_Id, DateCreated = a.Date });
            var QuestionAnswersJoint =
            db.Answers.Join(db.Questions,
        (answer) => answer.Q_Id,
        (question) => question.Q_Id,
         (A, Q) => new
         {
             values = A.Values,
             User_Id = Q.User_Id
         })
         .Where(a => a.User_Id == Convert.ToInt16(Id))
         .Select(a => a.values);
            var res = new
            {
                UserName = UserName.UserName,
                DateJoined = UserName.Date,
                SureveyCount = UserQuestionJoint.Count(),
                SurveyResponse = QuestionAnswersJoint.Count(),
                UserQuestionJoint = UserQuestionJoint,
                QuestionAnswersJoint = QuestionAnswersJoint
            };
            return Ok(JsonConvert.SerializeObject(res));
        }
        catch (Exception e) { return StatusCode(500, "An internal server error occurred.\n\n" + e); }
    }
}
public class UserChecker
{
    public String? Email { get; set; }
    public String? UserName { get; set; }
    public String Password { get; set; } = null!;
}
// public class DashBoardData
// {
//     public String UserName { set; get; } = null!;
//     public  DateTime Date { set; get; } = null!;
//     public String UserName { set; get; } = null!;
//     public String UserName { set; get; } = null!;
// }