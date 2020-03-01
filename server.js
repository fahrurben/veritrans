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
      this.namespace = "api"

      this.get("/dayahs", schema => {
        return schema.dayahs.all()
      })
    },
  })

  return server
}