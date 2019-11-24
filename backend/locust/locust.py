from locust import HttpLocust, TaskSet, task, between

class LoginListBehavior(TaskSet):

    auth_token = ""

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    @task(1)
    def accomodations(self):
        """ on_start is called when a Locust start before any task is scheduled """
        #self.login()

    def login(self):
        response = self.client.post("/authentication", {
          "strategy": "local",
          "email": "admin",
          "password": "admin"
        }).json()

        self.auth_token = response
     

class WebsiteUser(HttpLocust):
    task_set = LoginListBehavior
    wait_time = between(5, 9)

