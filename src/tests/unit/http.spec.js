import axios from "axios";
import nock from "nock";
import { API_DOMAIN } from '@/http/constants';
import {
  getLeiloes,
  getLeilao,
  getLances,
  createLance,
  createLeilao
} from "@/http/index";

axios.defaults.adapter = require("axios/lib/adapters/http");

describe("the http service", () => {
  describe("getLeiloes", () => {
    test("should exist", () => {
      expect(getLeiloes).toBeInstanceOf(Function);
    });

    test("should call API correctly ", async () => {
      const request = nock(API_DOMAIN)
        .get("/leiloes")
        .reply(200, "mock response");

      expect(await getLeiloes()).toBe("mock response");
      request.done();
    });
  });

  describe("getLeilao", () => {
    test("should exist", () => {
      expect(getLeilao).toBeInstanceOf(Function);
    });

    test("should call API correctly", async () => {
      const request = nock(API_DOMAIN)
        .get("/leiloes/12")
        .reply(200, "mock response");

      expect(await getLeilao(12)).toBe("mock response");
      request.done();
    });
  });

  describe("getLances", () => {
    test("should exist", () => {
      expect(getLances).toBeInstanceOf(Function);
    });

    test("should call API correctly", async () => {
      const request = nock(API_DOMAIN)
        .get("/lances/?leilao_id=12")
        .reply(200, [
          {
            id: 1,
            valor: 1001,
            data: "2020-06-13T18:04:26.826Z",
            leilao_id: 1
          },
          {
            valor: 1005,
            data: "2020-06-13T18:04:26.826Z",
            leilao_id: 1,
            id: 2
          }
        ]);

      expect(await getLances(12)).toStrictEqual([
        {
          id: 1,
          valor: 1001,
          data: new Date("2020-06-13T18:04:26.826Z"),
          leilao_id: 1
        },
        {
          valor: 1005,
          data: new Date("2020-06-13T18:04:26.826Z"),
          leilao_id: 1,
          id: 2
        }
      ]);
      request.done();
    });
  });

  describe("createLance", () => {
    test("should exist", () => {
      expect(createLance).toBeInstanceOf(Function);
    });

    test("should call API correctly", async () => {
      const request = nock(API_DOMAIN)
        .post("/lances")
        .reply(200, { id: 15 });

      const lance = {
        valor: 29,
        data: new Date(),
        leilao_id: 12
      };

      expect(await createLance(lance)).toBe(15);
      request.done();
    });
  });

  describe("createLeilao", () => {
    test("should exist", () => {
      expect(createLeilao).toBeInstanceOf(Function);
    });

    test("should call API correctly", async () => {
      const request = nock(API_DOMAIN)
        .post("/leiloes")
        .reply(200, "mock response");

      await createLeilao({
        produto: "Boina Italiana",
        descricao: "Um belo chapéu clássico",
        lanceInicial: "3"
      });

      request.done();
    });
  });
});
