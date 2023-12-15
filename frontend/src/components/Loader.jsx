 import { Bars } from  'react-loader-spinner'

export const Loader = () => {

    return (
      <div>
       <Bars
          height="40"
          width="40"
          color="#557C55"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    )
  }