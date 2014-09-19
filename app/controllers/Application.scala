package controllers

import play.api._
import play.api.libs.iteratee.{Enumerator, Iteratee}
import play.api.mvc._

import scala.util.Random
import scala.concurrent.ExecutionContext.Implicits.global

object Application extends Controller {

  def index = Action { request =>
    Ok(views.html.index(request))
  }

  def ws = WebSocket.using[String] { request =>

    val in = Iteratee.ignore[String]

    val iterator = (new TestIterator).map(_.toString)

    val out = Enumerator.enumerate(iterator).map { x =>
      Thread.sleep(500)
      x
    }


    (in, out)
  }

}

class TestIterator extends Iterator[Int] {

  def hasNext = true

  def next() = {
    Random.nextInt(50)
  }

  override def length = throw new IllegalStateException()

  override def size = length

}