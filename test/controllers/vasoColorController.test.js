const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const Color = require('../../models/vasoColor');

chai.use(chaiHttp);
const expect = chai.expect;

describe('VasoColor Controller', () => {
  beforeEach(async () => {
    await Color.deleteMany({});
  });

  describe('getAllColors', () => {
    it('should return all colors', async () => {
      const color1 = new Color({ name: 'color1', hexCode: '#ffffff', tipo: 'tipo1', activo: true });
      const color2 = new Color({ name: 'color2', hexCode: '#000000', tipo: 'tipo2', activo: false });
      await color1.save();
      await color2.save();

      const res = await chai.request(app).get('/colors');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0]).to.have.property('name', 'color1');
      expect(res.body[1]).to.have.property('name', 'color2');
    });

    it('should return 200 if no colors found', async () => {
      const res = await chai.request(app).get('/colors');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });
  });

  describe('createColor', () => {
    it('should create a new color', async () => {
      const color = { name: 'newcolor', hexCode: '#ff0000', tipo: 'tipo3', activo: true };

      const res = await chai.request(app).post('/colors').send(color);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('name', 'newcolor');
      expect(res.body).to.have.property('_id');
    });

    it('should return 500 if an error occurs during creation', async () => {
      // Simulate an error by providing an invalid property
      const color = { invalidProperty: 'invalid' };

      const res = await chai.request(app).post('/colors').send(color);

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('message');
    });
  });

  describe('getColorById', () => {
    it('should return a color by ID', async () => {
      const existingColor = new Color({ name: 'color1', hexCode: '#ffffff', tipo: 'tipo1', activo: true });
      await existingColor.save();

      const res = await chai.request(app).get(`/colors/${existingColor._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name', 'color1');
    });

    it('should return 404 if color ID not found', async () => {
      const res = await chai.request(app).get('/colors/nonexistentid');

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Color not found');
    });
  });

  describe('updateColor', () => {
    it('should update an existing color', async () => {
      const existingColor = new Color({ name: 'color1', hexCode: '#ffffff', tipo: 'tipo1', activo: true });
      await existingColor.save();

      const updatedColor = { name: 'updatedcolor', hexCode: '#000000', tipo: 'tipo2', activo: false };

      const res = await chai.request(app).put(`/colors/${existingColor._id}`).send(updatedColor);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('name', 'updatedcolor');
      expect(res.body).to.have.property('_id', existingColor._id.toString());
    });

    it('should return 404 if color ID not found', async () => {
      const updatedColor = { name: 'updatedcolor', hexCode: '#000000', tipo: 'tipo2', activo: false };

      const res = await chai.request(app).put('/colors/nonexistentid').send(updatedColor);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Color not found');
    });
  });

  describe('deleteColor', () => {
    it('should delete an existing color', async () => {
      const existingColor = new Color({ name: 'color1', hexCode: '#ffffff', tipo: 'tipo1', activo: true });
      await existingColor.save();

      const res = await chai.request(app).delete(`/colors/${existingColor._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message', 'Color deleted successfully');
    });

    it('should return 404 if color ID not found', async () => {
      const res = await chai.request(app).delete('/colors/nonexistentid');

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Color not found');
    });
  });
}).timeout(10000);
