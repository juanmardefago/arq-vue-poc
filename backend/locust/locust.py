from locust import HttpLocust, TaskSet, TaskSequence, task, between
import random

usernames = ["pepe", "pepa", "roberto", "alberto", "laura", "loro"]
domains = ["@pepe.com", "@loro.com", "@camba.coop", "@medium.org", "@hackerspace.com"]
provinces = ["Buenos Aires", "Catamarca", "Entre Rios"]


class AdminTaskSet(TaskSet):

    auth_token = ""

    def on_start(self):
        self.create_user()
        self.login()

    def login(self):
        response = self.client.post("/authentication", {
        "strategy": "local",
        "email": "admin@arq1-app.com",
        "password": "admin"
        }).json()

        self.auth_token = response["accessToken"]

    def get_approved_accommodations_list(self):
        response = self.client.get("/accommodation?approved=true&$limit=10",
        headers= { "Authorization": self.auth_token })
        return response

    def get_unapproved_accommodations_list(self):
        response = self.client.get("/accommodation?approved=false&$limit=10",
        headers= { "Authorization": self.auth_token })
        return response

    def create_accommodation(self):
        response = self.client.post("/accommodation",
        json={
          "location": {
            "province": {
              "name": random.choice(provinces),
              "id": 1
            },
            "city": {
              "name": random.choice(provinces),
              "id": 1
            },
            "address": "asdasd address"
          },
          "category": random.randrange(1, 5, 1),
          "type": "Hotel",
          "pensions": {
            "breakfast": 10,
            "halfPension": 20,
            "fullPension": 30
          }
        },
        headers= { "Authorization": self.auth_token })
        return response

    def create_user(self):
        response = self.client.post("/users",
        json={
          "email": random.choice(usernames) + str(random.randrange(0, 999999999999, 1)) + random.choice(domains),
          "password": "sarasa",
          "permissions": "user"
        },
        headers= { "Authorization": self.auth_token })
        return response


    @task(30)
    def list_approved_accommodations_task(self):
        self.get_approved_accommodations_list()

    @task(30)
    def list_unapproved_accommodations_task(self):
        self.get_unapproved_accommodations_list()

    @task(5)
    def create_random_accommodation(self):
        self.create_accommodation()

    @task(100)
    def edit_random_accommodation(self):
        response = self.get_approved_accommodations_list()

        if response.status_code == 200:
            json = response.json();
            json.data[random.randrange(0, json.total, 1)]._id

class WebsiteAdmin(HttpLocust):
    task_set = AdminTaskSet
    wait_time = between(2, 5)
