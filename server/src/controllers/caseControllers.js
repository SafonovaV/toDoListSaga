const { Case } = require('../../db/models/index');

const getAllCases = async (req, res) => {
  const { user } = req.session;
  try {
    const allCases = await Case.findAll({
      where: { user_id: user.id },
      order: [['id', 'DESC']],
      raw: true,
    });
    res.json({ allCases });
  } catch (error) {
    console.log('error', error);
  }
};

const createNewPost = async (req, res) => {
  const { title, description } = req.body;
  const { user } = req.session;
  try {
    const newCase = await Case.create({
      title,
      description,
      user_id: user.id,
      status: false,
      raw: true,
    });
    res.json({ newCase });
  } catch (error) {
    console.log(error);
  }
};

const deleteCase = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Case.destroy({ where: { id } });
    res.json(answer);
  } catch (error) {
    console.log(error);
  }
};

const changeStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const oneCase = await Case.findOne({ where: { id } });
    const answer = await Case.update(
      { status: !oneCase.status },
      { where: { id } }
    );

    res.json({ answer });
  } catch (error) {
    console.log(error);
  }
};

const editCase = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    await Case.update(
      { title, description },
      {
        where: {
          id,
        },
      }
    );
    const newEditCase = await Case.findOne({ where: { id }, raw: true });
    res.json({ newEditCase });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getAllCases,
  createNewPost,
  deleteCase,
  changeStatus,
  editCase,
};
