import React, { useState, useEffect } from 'react';
import './IssuedInvoiceDetail.css';
import { ReissueInvoicePage } from './ReissueInvoicePage.tsx';

// Toast Component for notifications
const Toast = ({ message, isVisible }) => {
    if (!isVisible) return null;
    return <div className="toast-notification">{message}</div>;
};

// Drawer component for editing the email address
const EmailEditDrawer = ({ initialEmail, onClose, onSubmit }) => {
    const [email, setEmail] = useState(initialEmail);

    const handleSubmit = () => {
        // A simple validation to ensure email is not empty
        if (email.trim()) {
            onSubmit(email);
        }
    };

    return (
        <div className="drawer-overlay" onClick={onClose}>
            <div className="confirmation-drawer email-drawer" onClick={(e) => e.stopPropagation()}>
                <header className="drawer-header">
                    <h3 className="drawer-title">修改邮箱</h3>
                    <button className="drawer-close-btn" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                    </button>
                </header>
                <main className="drawer-content">
                    <div className="drawer-content-section">
                        <div className="drawer-info-row stacked">
                            <span className="drawer-info-label">电子邮箱</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                                placeholder="请输入用于接收的电子邮箱"
                            />
                        </div>
                    </div>
                </main>
                <footer className="drawer-footer">
                    <button className="drawer-confirm-btn" onClick={handleSubmit}>提交</button>
                </footer>
            </div>
        </div>
    );
};

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

const InvoiceOrdersListPage = ({ invoice, onBack }) => {
    return (
        <div className="issued-invoice-detail-page">
            <header className="invoice-form-header">
                <button onClick={onBack} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
                <h1>发票详情</h1>
            </header>
            <main className="detail-main">
                {invoice.orders.map(order => (
                    <div key={order.id} className="order-card">
                        <div className="order-card-content">
                            <div className="order-details">
                                <div className="order-name-wrapper">
                                    <p className="order-name">{order.name}</p>
                                    {order.source && <span className="order-source-tag">{order.source}</span>}
                                </div>
                            </div>
                            <span className="order-amount">{order.amount.toFixed(2)}元</span>
                        </div>
                        <div className="order-card-footer">
                            <div className="order-date">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#999999"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                                <span>{formatDateWithWeekday(order.date)}</span>
                            </div>
                            {order.orderNumber && (
                                <div className="order-number">订单编号: {order.orderNumber}</div>
                            )}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};


export const IssuedInvoiceDetail = ({ invoice, onBack }) => {
    const [view, setView] = useState('detail'); // 'detail', 'orders', 'reissue'
    const [isMoreInfoExpanded, setIsMoreInfoExpanded] = useState(false);
    const [isEmailDrawerVisible, setIsEmailDrawerVisible] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);
    const toastMessage = "发票在5分钟内发送至您邮箱，请注意查收";

    const handleResendInvoice = () => {
        setIsEmailDrawerVisible(true);
    };

    const handleEmailSubmit = (newEmail) => {
        console.log(`New email submitted: ${newEmail}, for invoice ID: ${invoice.id}`);
        setIsEmailDrawerVisible(false);
        setIsToastVisible(true);
    };

    useEffect(() => {
        let timer;
        if (isToastVisible) {
            timer = setTimeout(() => {
                setIsToastVisible(false);
            }, 3000); // Hide toast after 3 seconds
        }
        return () => clearTimeout(timer);
    }, [isToastVisible]);

    const getInvoiceStatusClass = (status) => {
        switch (status) {
            case '已退票':
                return 'refunded';
            case '开票中':
                return 'invoicing';
            default:
                return ''; // for 已开票
        }
    };

    if (view === 'orders') {
        return (
            <InvoiceOrdersListPage
                invoice={invoice}
                onBack={() => setView('detail')}
            />
        );
    }
    
    if (view === 'reissue') {
        return (
            <ReissueInvoicePage
                invoice={invoice}
                onBack={() => setView('detail')}
                onGoToHistory={onBack}
            />
        );
    }

    return (
        <div className="issued-invoice-detail-page">
            <header className="invoice-form-header">
                <button onClick={onBack} className="invoice-header-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/></svg>
                </button>
                <h1>发票详情</h1>
            </header>

            <main className="detail-main">
                <div className="detail-card">
                    <div className="detail-row header-row">
                        <span className="detail-invoice-type">{invoice.type}</span>
                        <span className={`detail-invoice-status ${getInvoiceStatusClass(invoice.status)}`}>{invoice.status}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">购方名称</span>
                        <span className="detail-value">{invoice.buyerName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">购方税号</span>
                        <span className="detail-value">{invoice.taxId}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">发票金额</span>
                        <span className="detail-value amount">{invoice.amount.toFixed(2)} 元</span>
                    </div>
                     <div className="detail-row">
                        <span className="detail-label">申请时间</span>
                        <span className="detail-value">{invoice.datetime}</span>
                    </div>

                    {isMoreInfoExpanded && (
                        <div className="expanded-content">
                            <div className="detail-row">
                                <span className="detail-label">公司地址</span>
                                <span className="detail-value">{invoice.address || 'N/A'}</span>
                            </div>
                             <div className="detail-row">
                                <span className="detail-label">公司电话</span>
                                <span className="detail-value">{invoice.phone || 'N/A'}</span>
                            </div>
                             <div className="detail-row">
                                <span className="detail-label">开户行</span>
                                <span className="detail-value">{invoice.bank || 'N/A'}</span>
                            </div>
                             <div className="detail-row">
                                <span className="detail-label">开户行账号</span>
                                <span className="detail-value">{invoice.account || 'N/A'}</span>
                            </div>
                             <div className="detail-row">
                                <span className="detail-label">备注</span>
                                <span className="detail-value">{invoice.remarks || 'N/A'}</span>
                            </div>
                        </div>
                    )}

                    <div className="expand-info" onClick={() => setIsMoreInfoExpanded(!isMoreInfoExpanded)}>
                        <span>{isMoreInfoExpanded ? '收起更多信息' : '展开更多信息'}</span>
                        <svg className={isMoreInfoExpanded ? 'expanded' : ''} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                    </div>
                </div>

                <div className="detail-card">
                    <div className="detail-row orders-row" onClick={() => setView('orders')} style={{ cursor: 'pointer' }}>
                        <span>{`1张发票, 含${invoice.orderCount}个订单`}</span>
                        <span className="view-link">查看 &gt;</span>
                    </div>
                </div>

                 <div className="detail-card">
                    <div className="detail-row stacked">
                        <span className="detail-label">接收信息</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">电子邮箱</span>
                        <span className="detail-value">{invoice.email}</span>
                    </div>
                </div>

            </main>

            {invoice.status === '已开票' && (
                <footer className="detail-footer">
                    <button className="detail-footer-btn" onClick={handleResendInvoice}>重新发送发票</button>
                    <button className="detail-footer-btn" onClick={() => setView('reissue')}>申请重开发票</button>
                </footer>
            )}

            {isEmailDrawerVisible && (
                <EmailEditDrawer
                    initialEmail={invoice.email}
                    onClose={() => setIsEmailDrawerVisible(false)}
                    onSubmit={handleEmailSubmit}
                />
            )}
            
            <Toast message={toastMessage} isVisible={isToastVisible} />
        </div>
    );
};