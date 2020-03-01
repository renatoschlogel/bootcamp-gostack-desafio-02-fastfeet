import * as Yup from 'yup'; // este cara não tem o export default :-/
import Recipient from '../models/Recipient';

async function isDadosInvalidos(body) {
  const schema = Yup.object().shape({
    nome: Yup.string().required(),
    rua: Yup.string().required(),
    numero: Yup.number().required(),
    complemento: Yup.string(),
    estado: Yup.string().required(),
    cidade: Yup.string().required(),
    cep: Yup.string().required(),
  });

  return !(await schema.isValid(body));
}

class RecipientController {
  async store(req, res) {
    if (await isDadosInvalidos(req.body)) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const recipientExists = await Recipient.findOne({
      where: {
        nome: req.body.nome,
        numero: req.body.numero,
        cep: req.body.cep,
      },
    });

    if (recipientExists) {
      return res.status(400).json({
        error: `${req.body.nome} is already registered!`,
      });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });
    if (
      !(await schema.isValid(req.body)) ||
      (await isDadosInvalidos(req.body))
    ) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    let recipient = await Recipient.findByPk(req.body.id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient do not exists!' });
    }

    recipient = await recipient.update(req.body);

    return res.json(recipient);
  }
}

export default new RecipientController();
