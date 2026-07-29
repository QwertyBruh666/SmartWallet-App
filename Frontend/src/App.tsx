import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { RegistrationComponent } from './pages/Registration/Registration.tsx';
import { LoginComponent } from './pages/Login/Login.tsx';
import { MainPage } from './pages/Main/MainPage.tsx';
import { CoinInfoPage } from './pages/Coin/CoinInfoPage.tsx';
import { WalletPage } from './pages/Wallet/WalletPage.tsx';
import { FindCoinsPage } from './pages/Find/FindCoinsPage.tsx';
import { PageTemplate } from './pages/PageTemplate.tsx';
import { NewsPage } from './pages/News/NewsPage.tsx';
import { PortfolioPage } from './pages/Portfolio/PortfolioPage.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'; 
import { ProfilePage } from './pages/Profile/ProfilePage.tsx';
import { AuthPage } from './pages/Auth/Auth.tsx';

export const refreshPromise = { promise: null }
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 5, throwOnError: true } } })

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/App' element = { <PageTemplate/> }>
                        <Route path='Main' index element={<MainPage />} />
                        <Route path='WalletInfo/:ExchangeName' element={<WalletPage />} />
                        <Route path='Account' element={<ProfilePage />} />
                        <Route path='CoinInfo/:Id' element={<CoinInfoPage />} />
                        <Route path='FindCoins' element={<FindCoinsPage />} />
                        <Route path = "News" element={<NewsPage/>}/>
                        <Route path = "AllWallets" element={<PortfolioPage/>}/>
                    </Route>
                    <Route path="/Registration" element={<AuthPage page="Registration" />} />
                    <Route path='/Login' element={<AuthPage page="Login" />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App;
