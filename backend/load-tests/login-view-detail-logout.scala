
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class RecordedSimulation extends Simulation {

	val httpProtocol = http
		.baseUrl("http://192.168.0.10:8080")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:70.0) Gecko/20100101 Firefox/70.0")

	val headers_0 = Map("Origin" -> "http://localhost:8080")

	val headers_2 = Map(
		"Accept" -> "text/event-stream",
		"Pragma" -> "no-cache")



	val scn = scenario("RecordedSimulation")
		.exec(http("request_0")
			.get("/sockjs-node/info?t=1573441216231")
			.headers(headers_0)
			.resources(http("request_1")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_2")
			.get("/sockjs-node/305/o323c0tp/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_3")
			.get("/sockjs-node/info?t=1573441218051")
			.headers(headers_0)
			.resources(http("request_4")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_5")
			.get("/sockjs-node/504/vno45sbb/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_6")
			.get("/sockjs-node/info?t=1573441219948")
			.headers(headers_0)
			.resources(http("request_7")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_8")
			.get("/sockjs-node/451/qucdymw4/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_9")
			.get("/sockjs-node/info?t=1573441221839")
			.headers(headers_0)
			.resources(http("request_10")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_11")
			.get("/sockjs-node/734/5o5tx03c/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_12")
			.get("/sockjs-node/info?t=1573441223717")
			.headers(headers_0)
			.resources(http("request_13")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_14")
			.get("/sockjs-node/820/fldzukwh/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_15")
			.get("/sockjs-node/info?t=1573441225610")
			.headers(headers_0)
			.resources(http("request_16")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_17")
			.get("/sockjs-node/117/bseksd5r/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_18")
			.get("/sockjs-node/info?t=1573441227481")
			.headers(headers_0))
		.pause(1)
		.exec(http("request_19")
			.get("/__webpack_dev_server__/sockjs.bundle.js")
			.resources(http("request_20")
			.get("/sockjs-node/303/3aj30qm5/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_21")
			.get("/sockjs-node/info?t=1573441230630")
			.headers(headers_0)
			.resources(http("request_22")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_23")
			.get("/sockjs-node/670/o3glgbgu/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_24")
			.get("/sockjs-node/info?t=1573441232607")
			.headers(headers_0))
		.pause(1)
		.exec(http("request_25")
			.get("/__webpack_dev_server__/sockjs.bundle.js")
			.resources(http("request_26")
			.get("/sockjs-node/558/sty1hyqr/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_27")
			.get("/sockjs-node/info?t=1573441235658")
			.headers(headers_0)
			.resources(http("request_28")
			.get("/__webpack_dev_server__/sockjs.bundle.js"),
            http("request_29")
			.get("/sockjs-node/993/vxezk0tq/eventsource")
			.headers(headers_2)))
		.pause(1)
		.exec(http("request_30")
			.get("/sockjs-node/info?t=1573441237388")
			.headers(headers_0))

	setUp(scn.inject(atOnceUsers(1))).protocols(httpProtocol)
}