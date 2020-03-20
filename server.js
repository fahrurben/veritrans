import { Server, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      dayah: Model,
      bankAccount: Model,
      transaction: Model
    },

    seeds(server) {
      server.create("dayah", { id: 1, name: "Dayah 1" })
      server.create("dayah", { id: 2, name: "Dayah 2" })
      server.create("bankAccount", { code: '1', name: "Bank 1" })
      server.create("bankAccount", { code: '2', name: "Bank 2" })
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

      this.get("/dayahs", schema => {
        return schema.dayahs.all();
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

        return { status: 'success', message: 'Login sukses', token: '123' }
      });

      this.get("/bank", schema => {
        return schema.bankAccounts.all();
      });

      this.post("/transaksi", (schema, request) => {
        let requestObj = JSON.parse(request.requestBody);

        return { status: 'success', message: 'Transaksi telah disubmit' }
      });

      this.get("/transaction", schema => {
        return schema.transactions.all();
      });
    },
  })

  return server
}