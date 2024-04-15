import { Router } from 'express';
import BeneficiarioCtrl from '../Controles/BeneficiarioCtrl.js';


const rotaBeneficiario = new Router();
const beneCtrl = new BeneficiarioCtrl();

rotaBeneficiario
.get('/', beneCtrl.consultar)
.get('/:termo', beneCtrl.consultar) //atribuindo a função consultar como parâmetro do que executar quando receber um método get na rota
.post('/', beneCtrl.gravar)
.put('/:codigo', beneCtrl.atualizar)
.patch('/:codigo', beneCtrl.atualizar)
.delete('/:codigo', beneCtrl.excluir);

export default rotaBeneficiario;