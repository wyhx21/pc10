import {
  message as antMessage,
  notification as antNotification,
} from 'ant-design-vue'
// import { infoLog,errorLog } from "@utils/messagerUtil.js"

const errorLog = (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err.message, err)
  }
  Message({ message: err.message, type: 'error' })
}

const infoLog = ({ respCode, respMsg }) => {
  if (process.env.NODE_ENV === 'development') {
    Message({
      message: `respCode:${respCode},respMsg:${respMsg}`,
      type: 'warning',
    })
  } else {
    Message({ message: `${respMsg}`, type: 'warning' })
  }
}

const Message = ({ message, type }) => {
  if ('warning' == type) {
    antMessage.warning(message)
  } else if ('error' == type) {
    antMessage.error(message)
  } else {
    antMessage.success(message)
  }
}

const notification = ({ message, description, placement = 'topRight' }) => {
  antNotification.open({
    message,
    description,
    placement,
  })
}
// const Confirm = ({ message, title, theme }) =>
//   Dialog.confirm({ message, title, theme });

export { infoLog, errorLog, Message, notification }
