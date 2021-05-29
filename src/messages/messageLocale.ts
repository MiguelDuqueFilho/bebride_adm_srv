import dotenv from 'dotenv';
dotenv.config();

function messageLocale(key: string) {
  const language = process.env.MESSAGE_LOCATE;
  try {
    let msg = localMessage[language][key];
    if (typeof msg === 'undefined') {
      msg = localMessage.pt_BR.messageNotFound;
    }
    return msg;
  } catch (error) {
    return localMessage.pt_BR.messageNotFound;
  }
}

export const localMessage = {
  pt_BR: {
    // message not found
    messageNotFound: 'Mensagem não encontrada para localidade `pt_BR`.',
    // Error validation
    joiAnyOnly: `{#label} deve ser {if(#valids.length == 1, "", "um deste itens: ")}{{#valids}}`,
    joyAnyRequired: `{#label} é obrigatório'`,
    joyStringBase: `{#label} precisa ser texto`,
    joyStringEmail: `{#label} precisa ser um E-mail válido.`,
    joyStringMin: `{#label} deve conter no mínimo {#limit} caracteres`,
    joyStringMax: `{#label} deve conter no maximo {#limit} caracteres`,
    // Error messages
    tokenInvalid: `Token Invalido.`,
    notAdmin: `Usuário não é administrador.`,
    // Success messages
    loginSuccessful: "You've successfully logged in.",
    emailSent: 'Your password recovery email was sent.',
  },
};

export { messageLocale };
