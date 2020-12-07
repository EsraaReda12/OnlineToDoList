using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        public CustomDBContext db = new CustomDBContext();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetToDoList()
        {   
           var UserId= User.Identity.GetUserId();
            var data = (from a in db.ToDoLists
                          where a.UserId == UserId
                        select a);
            return Json(new { data = data.ToList() }, JsonRequestBehavior.AllowGet );
        }
        public ActionResult AddEdit(int id=0)
        {
            if (id == 0)
            {
                var model = new ToDoList.Models.ToDoList();
                model.DueDate = DateTime.Now;
                return PartialView("_AddEdit", model);
            }
            else
            {
                var Data = (from a in db.ToDoLists
                            where a.Id == id
                            select a).FirstOrDefault();
                return PartialView("_AddEdit", Data);
            }
        }
        [HttpPost]
        public ActionResult AddEdit(ToDoList.Models.ToDoList Model)
        {
            if (Model.Id==0)
            {
                var UserId = User.Identity.GetUserId();
                Model.UserId = UserId;
                Model.Marked = false;
                db.ToDoLists.Add(Model);
            }
            else
            {
                var obj = (from a in db.ToDoLists
                            where a.Id == Model.Id
                            select a).FirstOrDefault();
                obj.Title = Model.Title;
                obj.DueDate = Model.DueDate;
            }
            var res = db.SaveChanges();
            return Json(res,JsonRequestBehavior.AllowGet);
        }
        public ActionResult Delete(int Id)
        {
            var obj = (from a in db.ToDoLists
                        where a.Id ==Id
                        select a).FirstOrDefault();
            db.ToDoLists.Remove(obj);
            var res = db.SaveChanges();
            return Json(res,JsonRequestBehavior.AllowGet);
        }
        public ActionResult MarkDone(int Id)
        {
            var obj = (from a in db.ToDoLists
                       where a.Id == Id
                       select a).FirstOrDefault();
            obj.Marked = true;
            var res = db.SaveChanges();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
}