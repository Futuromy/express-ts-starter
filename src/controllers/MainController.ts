import type { ParamsMainHandler } from '@/Validations/MainValidation';

export class MainController {
  private message: string;

  constructor() {
    this.message = 'Hello World';
  }

  public getMessage: ParamsMainHandler = async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({ message: this.message, id });
  };
}

const mainController = new MainController();

export default mainController;
