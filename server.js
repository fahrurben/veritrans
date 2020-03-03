import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      dayah: Model,
    },

    seeds(server) {
      server.create("dayah", { id: 1, name: "Dayah 1" })
      server.create("dayah", { id: 2, name: "Dayah 2" })
    },

    routes() {
      this.namespace = "api";

      this.get("/dayahs", schema => {
        return schema.dayahs.all();
      });

      this.post("/register", (schema, request) => {
        let requestObj = JSON.parse(request.requestBody);
      
        if (requestObj.nik == '123') {
          return { status: 'error', message: 'Akun dengan nik ' + requestObj.nik + ' sudah ada'};
        }

        return { status: 'success', message: 'Akun berhasil dibuat, silahkan login dengan NIK dan Password yang sudah disubmit' };
      })
    },
  })

  return server
}