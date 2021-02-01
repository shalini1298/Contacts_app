
import { userData } from "./action"

const initialState = {
  personList: [
    { userName: 'xyz', emailId: 's@gmail.com', companyName: 'sample' }
  ]
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
  switch (type) {
    case userData.personList:
      return {
        ...state,
        personList: payload
      }
    default:
      return state
  }

}