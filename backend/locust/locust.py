from locust import HttpLocust, TaskSet, task, between

class LoginListBehavior(TaskSet):

    auth_token = ""

    def on_start(self):
        self.login()

    @task(1)
    def accomodations(self):
        self.accommodations()

    def login(self):
        response = self.client.post("/authentication", {
          "strategy": "local",
          "email": "admin",
          "password": "admin"
        }).json()

        self.auth_token = response["accessToken"]

    def accommodations(self):
        response = self.client.get("/accommodation", 
        headers= { "Authorization": self.auth_token }).json()
        print(response)
     

class WebsiteUser(HttpLocust):
    task_set = LoginListBehavior
    wait_time = between(5, 9)

