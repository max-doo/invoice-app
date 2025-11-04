import React, { useState, useMemo, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { InvoicePage } from './invoice.tsx';
import { IssuedInvoiceDetail } from './IssuedInvoiceDetail.tsx';

const mockSaleOrders = [
    { id: 1, date: '2023年10月26日 14:20', name: '游戏币套餐', amount: 30.00, selected: false, orderNumber: 'NO20231026142051', source: '小程序' },
    { id: 2, date: '2023年10月26日 12:15', name: '次票*1;游戏币套餐*2', amount: 200.00, selected: false, orderNumber: 'NO20231026121532', source: '收银台' },
    { id: 3, date: '2023年10月25日 18:30', name: '游戏币套餐', amount: 30.00, selected: false, orderNumber: 'NO20231025183011', source: '小程序' },
    { id: 4, date: '2023年10月25日 13:55', name: '次卡', amount: 55.50, selected: false, orderNumber: 'NO20231025135545', source: '收银台' },
    { id: 5, date: '2023年10月24日 11:05', name: '会员充值', amount: 100.00, selected: false, orderNumber: 'NO20231024110559', source: '小程序' },
];

const mockDeductionOrders = [
    { id: 6, date: '2023年10月26日 10:00', name: '美团游戏币套餐', amount: 150.00, selected: false, orderNumber: 'NO20231026100023', source: '美团' },
    { id: 7, date: '2023年10月25日 09:30', name: '抖音次票', amount: 88.00, selected: false, orderNumber: 'NO20231025093018', source: '抖音' },
    { id: 8, date: '2023年10月24日 16:45', name: '美团游戏币套餐', amount: 200.00, selected: false, orderNumber: 'NO20231024164504', source: '美团' },
];

const mockIssuedInvoices = [
    {
        id: 4,
        datetime: '2025.10.18 周六 10:00',
        service: '娱乐服务',
        type: '电子发票',
        amount: 500.00,
        status: '开票中',
        buyerName: '未来创新集团',
        taxId: '91310115MA1K4ABCD1',
        email: 'finance@future-innovate.com',
        orderCount: 1,
        orders: [
            { id: 11, date: '2023年10月27日 10:00', name: '会员充值', amount: 500.00, orderNumber: 'NO20231027100000', source: '小程序' },
        ],
        address: '上海市科技园区未来大道1号',
        phone: '021-11223344',
        bank: '未来银行上海分行',
        account: '9876543210987654',
        remarks: '加急处理'
    },
    {
        id: 1,
        datetime: '2025.10.17 周五 11:27',
        service: '娱乐服务',
        type: '电子发票',
        amount: 30.91,
        status: '已开票',
        buyerName: '某某科技有限公司',
        taxId: '91310000MA1FL2MX7B',
        email: 'contact@example-tech.com',
        orderCount: 2,
        orders: [
            { id: 2, date: '2023年10月26日 12:15', name: '次票', amount: 0.91, orderNumber: 'NO20231026121532', source: '收银台' },
            { id: 3, date: '2023年10月25日 18:30', name: '游戏币套餐', amount: 30.00, orderNumber: 'NO20231025183011', source: '小程序' },
        ],
        address: '上海市示例路123号',
        phone: '021-12345678',
        bank: '中国工商银行上海分行',
        account: '6222021001123456789',
        remarks: '这是发票备注信息。'
    },
    {
        id: 2,
        datetime: '2025.10.16 周四 09:15',
        service: '娱乐服务',
        type: '电子发票',
        amount: 88.00,
        status: '已开票',
        buyerName: '上海示例信息技术有限公司',
        taxId: '91310115MA1K395687',
        email: 'invoice@example-sh.com',
        orderCount: 1,
        orders: [
            { id: 7, date: '2023年10月25日 09:30', name: '抖音游戏币套餐', amount: 88.00, orderNumber: 'NO20231025093018', source: '抖音' },
        ],
        address: '上海市浦东新区世纪大道2001号',
        phone: '021-87654321',
        bank: '招商银行上海陆家嘴支行',
        account: '6214830987654321',
        remarks: ''
    },
    {
        id: 3,
        datetime: '2025.10.15 周三 20:50',
        service: '娱乐服务',
        type: '电子发票',
        amount: 120.50,
        status: '已退票',
        buyerName: '个人',
        taxId: 'N/A',
        email: 'user@example-personal.com',
        orderCount: 2,
        orders: [
            { id: 4, date: '2023年10月25日 13:55', name: '单点服务', amount: 55.50, orderNumber: 'NO20231025135545', source: '收银台' },
            { id: 10, date: '2023年10月25日 14:00', name: '附加项目', amount: 65.00, orderNumber: 'NO20231025140010', source: '小程序' },
        ],
        address: '',
        phone: '',
        bank: '',
        account: '',
        remarks: '个人发票无备注。'
    },
];

const formatDateWithWeekday = (dateString: string): string => {
    const parsableDateString = dateString
        .replace('年', '-')
        .replace('月', '-')
        .replace('日', '');
    const date = new Date(parsableDateString);
    if (isNaN(date.getTime())) {
        return dateString.replace(/年|月/g, '.').replace(/日/, '');
    }

    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${weekday} ${hours}:${minutes}`;
};


const App = () => {
    const [view, setView] = useState('list');
    const [activeTopTab, setActiveTopTab] = useState('sales');
    const [activeBottomTab, setActiveBottomTab] = useState('issue');
    const [orders, setOrders] = useState(mockSaleOrders);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const selectedOrders = useMemo(() => orders.filter(o => o.selected), [orders]);
    const totalAmount = useMemo(() => selectedOrders.reduce((sum, order) => sum + order.amount, 0), [selectedOrders]);

    const isAllSelected = useMemo(() => orders.length > 0 && orders.every(order => order.selected), [orders]);
    const isAnySelected = useMemo(() => orders.some(order => order.selected), [orders]);

    useEffect(() => {
        if (activeTopTab === 'sales') {
            setOrders(mockSaleOrders.map(o => ({...o, selected: false})));
        } else {
            setOrders(mockDeductionOrders.map(o => ({...o, selected: false})));
        }
    }, [activeTopTab]);

    useEffect(() => {
        if (activeBottomTab !== 'issue' && view !== 'list') {
            setView('list');
        }
    }, [activeBottomTab, view]);

    const handleSelectOrder = (id) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === id ? { ...order, selected: !order.selected } : order
            )
        );
    };

    const handleSelectAll = () => {
        const newSelectedState = !isAllSelected;
        setOrders(prevOrders =>
            prevOrders.map(order => ({ ...order, selected: newSelectedState }))
        );
    };

    const handleNext = () => {
        if (isAnySelected) {
            setView('invoice');
        }
    };
    
    const handleBackFromInvoice = () => {
        setView('list');
    };

    const handleGoToHistory = () => {
        setActiveBottomTab('issued');
        setView('list');
    };

    const handleSelectInvoice = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleBackFromDetail = () => {
        setSelectedInvoice(null);
    };

    const handleBackFromMain = () => {
        // This is the main page, so there's nowhere to go back to.
        // In a real app, this might close the webview.
    };

    if (selectedInvoice) {
        return (
            <IssuedInvoiceDetail
                invoice={selectedInvoice}
                onBack={handleBackFromDetail}
            />
        );
    }

    if (view === 'invoice') {
        return (
            <InvoicePage
                totalAmount={totalAmount}
                selectedOrders={selectedOrders}
                onBack={handleBackFromInvoice}
                onGoToHistory={handleGoToHistory}
            />
        );
    }

    const headerTitle = activeBottomTab === 'issue' ? '发票开具' : '开票记录';

    return (
        <>
            <div className="app-container">
                <Header 
                    title={headerTitle}
                    onBack={handleBackFromMain}
                />
                {activeBottomTab === 'issue' ? (
                    <>
                        <OrderTypeTabs activeTab={activeTopTab} onTabChange={setActiveTopTab} />
                        <OrderList orders={orders} onSelectOrder={handleSelectOrder} />
                    </>
                ) : (
                    <IssuedInvoicesView invoices={mockIssuedInvoices} onSelectInvoice={handleSelectInvoice} />
                )}
                 {activeBottomTab === 'issue' && (
                    <ActionBar
                        isAllSelected={isAllSelected}
                        isAnySelected={isAnySelected}
                        onSelectAll={handleSelectAll}
                        onNext={handleNext}
                    />
                )}
            </div>
            <BottomNav activeTab={activeBottomTab} onTabChange={setActiveBottomTab} />
        </>
    );
};

interface HeaderProps {
    title: string;
    onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBack }) => (
    <header className="header">
        {onBack &&
            <button onClick={onBack} className="header-back-btn" aria-label="Back">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" /></svg>
            </button>
        }
        <h1 className="header-title">{title}</h1>
    </header>
);

const OrderTypeTabs = ({ activeTab, onTabChange }) => (
    <div className="order-type-tabs-container">
        <div className="order-type-tabs">
            <button
                className={`order-type-tab ${activeTab === 'sales' ? 'active' : ''}`}
                onClick={() => onTabChange('sales')}
            >
                销售订单
            </button>
            <button
                className={`order-type-tab ${activeTab === 'write-off' ? 'active' : ''}`}
                onClick={() => onTabChange('write-off')}
            >
                核销订单
            </button>
        </div>
    </div>
);

const OrderList = ({ orders, onSelectOrder }) => (
    <main className="order-list">
        {orders.map(order => (
            <div
                key={order.id}
                className={`order-card ${order.selected ? 'selected' : ''}`}
                onClick={() => onSelectOrder(order.id)}
            >
                <div className="order-card-content">
                    <div className={`custom-checkbox ${order.selected ? 'checked' : ''}`}></div>
                    <div className="order-details">
                         <div className="order-name-wrapper">
                            <p className="order-name">{order.name}</p>
                            <span className="order-source-tag">{order.source}</span>
                        </div>
                    </div>
                    <span className="order-amount">{order.amount.toFixed(2)}元</span>
                </div>
                <div className="order-card-footer">
                     <div className="order-date">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#999999"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                        <span>{formatDateWithWeekday(order.date)}</span>
                    </div>
                    <div className="order-number">
                        订单编号: {order.orderNumber}
                    </div>
                </div>
            </div>
        ))}
    </main>
);

const IssuedInvoicesView = ({ invoices, onSelectInvoice }) => {
    if (!invoices || invoices.length === 0) {
        return (
             <div className="placeholder-view">
                <h2>开票记录</h2>
                <p>这里会显示您已开具的发票列表。</p>
            </div>
        );
    }

    const getInvoiceStatusClass = (status) => {
        switch (status) {
            case '已退票':
                return 'refunded';
            case '开票中':
                return 'invoicing';
            default:
                return '';
        }
    };

    return (
        <main className="issued-invoices-list">
            {invoices.map(invoice => (
                <div key={invoice.id} className="invoice-card" onClick={() => onSelectInvoice(invoice)}>
                    <div className="invoice-card-header">
                        <div className="invoice-date-time">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#999999"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            <span>{invoice.datetime}</span>
                        </div>
                        <div className="view-details-link">
                           <span>查看详情</span>
                           <span className="arrow-icon">&gt;</span>
                        </div>
                    </div>
                    <div className="invoice-card-body">
                        <div>
                            <span className="service-name">{invoice.service}</span>
                            <span className={`invoice-tag ${getInvoiceStatusClass(invoice.status)}`}>{invoice.status}</span>
                        </div>
                        <span className="invoice-amount">{invoice.amount.toFixed(2)} 元</span>
                    </div>
                    <div className="invoice-card-footer">
                        <span>{invoice.buyerName}</span>
                        <span>{invoice.taxId}</span>
                    </div>
                </div>
            ))}
        </main>
    );
};


const ActionBar = ({ isAllSelected, isAnySelected, onSelectAll, onNext }) => (
    <div className="action-bar">
        <div className="select-all-container" onClick={onSelectAll}>
            <div className={`custom-checkbox ${isAllSelected ? 'checked' : ''}`}></div>
            <span>全选</span>
        </div>
        <button className="next-button" disabled={!isAnySelected} onClick={onNext}>
            开具发票
        </button>
    </div>
);

const BottomNav = ({ activeTab, onTabChange }) => (
    <nav className="bottom-nav">
        <button
            className={`nav-item ${activeTab === 'issue' ? 'active' : ''}`}
            onClick={() => onTabChange('issue')}
            aria-label="发票开具"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
            <span>发票开具</span>
        </button>
        <button
            className={`nav-item ${activeTab === 'issued' ? 'active' : ''}`}
            onClick={() => onTabChange('issued')}
            aria-label="开票记录"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
            <span>开票记录</span>
        </button>
    </nav>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);