import {Page} from "../../components/Page";
import {BackBtn} from "../../components/backBtn";
import {useNavigate} from "react-router-dom";
import {Table} from "../../components/Table";
import {MoneyTransferCard} from "../../components/MoneyTransferCard";
import {IMoneyTransfer} from "../../domain/entity/IMoneyTransfer";
import {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../state/AppContext";
import {UsersService} from "../../services/UsersService";
import {PaymentsService} from "../../services/PaymentsService";
import {MoneyTransfersService} from "../../services/MoneyTransfersService";
import {IPayment} from "../../domain/entity/IPayment";
import {IUser} from "../../domain/entity/IUser";

export const MoneyTransfers = () => {
    const navigate = useNavigate();

    const appState = useContext(AppContext);
    const paymentsService = useMemo(() => new PaymentsService(appState), [appState]);
    const moneyTransfersService = useMemo(() => new MoneyTransfersService(appState), [appState]);
    const usersService = useMemo(() => new UsersService(appState), [appState]);

    const [rows, setRows] = useState([] as JSX.Element[][]);

    const payments: IPayment[] = useMemo(() => [
        {
            userId: "3f86bd90-f44b-426d-935e-1f522f8ce8f7",
            amount: 390.14,
            timestamp: "12.06.22",
            requirementId: "ApartsRentId"
        },
        {
            userId: "3f86bd90-f44b-426d-935e-1f522f8ce899",
            amount: 1108.72,
            timestamp: "22.06.22",
            requirementId: "CarRentalId"
        },
    ], [])

    useEffect(() => {
        const fetchRows = async () => {
            setRows(await getPaymentRows(payments));
        }
        const fetchPayments = async () => {
            // const user = (await paymentsService.getMeetingPayments()).data;
            // const user = (await moneyTransfersService.getMeetingTransfers()).data;
        }
        fetchRows().catch(console.error);
        fetchPayments().catch(console.error);

    }, [payments])

    const headerRows = [
        <div className="font-semibold text-left">Payer</div>,
        <div className="font-semibold text-left">Description</div>,
        <div className="font-semibold text-left">Amount</div>,
        <div className="font-semibold text-center">Date</div>
    ]

    interface IPayer extends IUser {
        photo?: string
    }

    async function getPayer(userId: string): Promise<IPayer | undefined> {
        const user = (await usersService.get(userId)).data;
        const photoURL = await usersService.getUserPhotoUrl(userId);
        if (user != null) {
            return {...user, photo: photoURL}
        }
        return undefined;
    }

    async function getPaymentRows(payments: IPayment[]): Promise<JSX.Element[][]> {
        const rows = [];
        for (const payment of payments) {
            const payer = await getPayer(payment.userId);
            const row = [
                <div className="flex items-center">
                    {payer?.photo === undefined ? <></> :
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full"
                                 src={payer.photo}
                                 width="40" height="40" alt={payer.fullName}/>
                        </div>
                    }
                    <div className="font-medium text-gray-800">{payer?.fullName ?? payment.userId}</div>
                </div>,
                <div className="text-left">{payment.requirementId}</div>,
                <div className="text-left font-medium text-green-500">${payment.amount}</div>,
                <div className="text-center">{payment.timestamp}</div>
            ]
            rows.push(row);
        }
        return rows;
    }

    const transfer: IMoneyTransfer = {
        amount: 200.45,
        transferType: 0,
        senderId: "3f86bd90-f44b-426d-935e-1f522f8ce8f7",
        receiverId: "3f86bd90-f44b-426d-935e-1f522f8ce899",
        sentTime: "24.06.22",
    }

    return (
        <Page
            name={"Money Transfers"}
            backBtn={<BackBtn text={"Back to meetings"} action={() => {
                navigate(`/meetings`)
            }}/>}
        >
            <div className={"flex flex-col items-center gap-5"}>
                <Table tableName={"Transactions"} headerRow={headerRows} rows={rows}/>

                <div className={"text-lg text-gray-500 border-b-2 border-gray-200"}>Transfers</div>
                <div className={"flex flex-wrap justify-center gap-5"}>
                    <MoneyTransferCard moneyTransfer={transfer}/>
                    <MoneyTransferCard moneyTransfer={{...transfer, acceptedTime: "24.06.22", transferType: 1}}/>
                    <MoneyTransferCard moneyTransfer={{...transfer, acceptedTime: "24.06.22"}}/>
                    <MoneyTransferCard moneyTransfer={{...transfer, transferType: 1}}/>
                    <MoneyTransferCard moneyTransfer={transfer}/>
                </div>

                <div className={"text-lg text-gray-500 border-b-2 border-gray-200"}>Debts</div>
                <div className={"flex flex-wrap justify-center gap-5"}>
                    <MoneyTransferCard moneyTransfer={{...transfer, sentTime: undefined, transferType: undefined}}/>
                    <MoneyTransferCard moneyTransfer={{...transfer, sentTime: undefined, transferType: undefined}}/>
                </div>
            </div>
        </Page>
    )
}