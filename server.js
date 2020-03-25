import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      institusi: Model,
      bankAccount: Model,
      transaction: Model
    },

    seeds(server) {
      server.create("institusi", { id: 1, name: "Dayah 1" })
      server.create("institusi", { id: 2, name: "Dayah 2" })
      server.create("bankAccount", { id: 1, institusi_id: 1, name: "Bank 1" })
      server.create("bankAccount", { id: 2, institusi_id: 1, name: "Bank 2" })
      server.create("transaction", { 
        id: '1', 
        bank: '1',
        bankName: 'Mandiri',
        nominal: 100,
        tanggal: new Date()
      })
    },

    routes() {
      this.namespace = "api";

      this.get("/institusi", schema => {
        return [
          {
            "id": 1,
            "name": "Test",
            "deleted_at": null,
            "created_at": null,
            "updated_at": null
          },
          {
            "id": 2,
            "name": "Test2",
            "deleted_at": null,
            "created_at": null,
            "updated_at": null
          }
        ];
      });

      this.post("/register", (schema, request) => {
        let requestObj = JSON.parse(request.requestBody);
      
        if (requestObj.nik == '123') {
          return { status: 'error', message: 'Akun dengan nik ' + requestObj.nik + ' sudah ada'};
        }

        return { status: 'success', message: 'Akun berhasil dibuat, silahkan login dengan NIK dan Password yang sudah disubmit' };
      });

      this.post("/login", (schema, request) => {
        let requestObj = JSON.parse(request.requestBody);
      
        if (requestObj.nik == '123') {
          return { status: 'error', message: 'NIK atau Password salah'};
        }

        return { status: 'success', message: 'Login sukses', api_token: '123' }
      });

      this.get("/institusi/bank/:id", schema => {
        return [
          { id: 1, institusi_id: 1, name: "Bank 1" },
          { id: 2, institusi_id: 1, name: "Bank 2" },
        ]
      });

      this.post("/transaksi", (schema, request) => {
        let requestObj = JSON.parse(request.requestBody);

        return { status: 'success', message: 'Transaksi telah disubmit' }
      });

      this.get("/transaction", schema => {
        return [
          {
            "id": 1,
            "bank_name": "Test",
            "date": "2010-01-01 00:00:00",
            "nominal": 1000000,
            "deleted_at": null,
            "created_at": null,
            "updated_at": null
          },
        ];
      });
    },
  })

  return server
}