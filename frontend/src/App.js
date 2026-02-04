import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import Loading from './components/Loading/Loading';
import { useLoading } from './Hooks/useLoading';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import { useEffect } from 'react';
import ChatBot from './components/ChatBot/ChatBot';


function App() {
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  return  (
<>
        <Loading />
        <Header />
        <AppRoutes />
        
      </>
  );
}

export default App;
