import React, {useContext, useEffect, useMemo, useState} from "react";
import {IRequirement} from "../domain/entity/IRequirement";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../state/AppContext";
import {RequirementParametersService} from "../services/RequirementParametersService";
import {IRequirementParameter} from "../domain/entity/IRequirementParameter";
import {PriorityIcon} from "./PriorityIcon";
import moment from "moment";
import {EditMenu} from "./EditMenu";
import {ConfirmDialog} from "./ConfirmDialog";
import {RequirementsService} from "../services/RequirementsService";
import {PaymentsService} from "../services/PaymentsService";
import {IPayment} from "../domain/entity/IPayment";
import {Guests} from "./Guests";

export const Requirement = (props: { requirement: IRequirement }) => {

    const navigate = useNavigate();
    const appState = useContext(AppContext);
    const requirementsService = useMemo(() => new RequirementsService(appState), [appState]);
    const requirementParametersService = useMemo(() => new RequirementParametersService(appState), [appState]);
    const paymentsService = useMemo(() => new PaymentsService(appState), [appState]);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [parameters, setParameters] = useState([] as IRequirementParameter[])
    const [payments, setPayments] = useState([] as IPayment[])

    useEffect(() => {
        const fetchRequirements = async () => {
            if (props.requirement.id == null) {
                return;
            }
            const response = await requirementParametersService.getRequirementParameters(props.requirement.id);
            if (response.status < 300 && response.data !== undefined) {
                setParameters(response.data);
            }
        }
        const fetchPayments = async () => {
            if (props.requirement.id == null) {
                return;
            }
            const response = await paymentsService.getRequirementPayment(props.requirement.id);
            if (response.status < 300 && response.data !== undefined) {
                setPayments(response.data);
            }
        }
        fetchRequirements().catch(console.error);
        fetchPayments().catch(console.error)

    }, [paymentsService, props.requirement.id, requirementParametersService]);

    function deleteEvent(eventId: string): void {
        requirementsService.delete(eventId).then(() =>
            navigate(0)
        )
    }

    function getBudgetSpentPercent(): number {
        const totalSpent = payments.map(val => val.amount).reduce((prev, cur) => prev + cur, 0);
        if (totalSpent > props.requirement.budgetPerPerson) {
            return 100;
        } else {
            return totalSpent / props.requirement.budgetPerPerson * 100;
        }
    }

    return (
        <div className="h-full relative">

            <div className={"absolute -top-16 w-full"}>
                <Guests guests={[]}/>
            </div>

            <div className="max-w-xs mx-auto">
                <div className="flex flex-col h-full bg-white shadow-lg rounded-lg">

                    <div className="relative flex-grow flex flex-col p-5">
                        <div className="absolute top-0 left-0 w-full bg-gray-200 rounded-t-full h-1.5 dark:bg-gray-700">
                            <div className="bg-indigo-500 h-1.5 rounded-t-full dark:bg-blue-500"
                                 style={{width: `${getBudgetSpentPercent()}%`}}></div>
                        </div>

                        <div
                            className="absolute -top-3 right-2 rounded-full bg-indigo-500 text-white font-bold shadow-md">
                            <span className="px-4 py-2">{props.requirement.budgetPerPerson}$</span>
                        </div>

                        <div className="flex-grow">
                            <header className="mb-3 flex justify-between gap-5">
                                <h3 className="text-[22px] text-gray-900 font-extrabold leading-snug">{props.requirement.title}</h3>
                            </header>
                            <div className="mb-2">
                                <p>{props.requirement.description}</p>
                            </div>
                        </div>

                        <div
                            className="w-full text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <span className="font-light">Parameters:</span>
                            {parameters.sort((a, b) => b.priority - a.priority).map((value, index) => (
                                <div key={index}
                                     className={`inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 ${index % 2 === 0 ? "bg-indigo-100" : "bg-indigo-50"} hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white gap-2`}>
                                    <div className={"h-full w-4"}>
                                        <PriorityIcon priority={value.priority}/>
                                    </div>
                                    {value.parameterDesc}
                                </div>
                            ))}
                        </div>

                        <hr className="mb-3"/>

                        <div className="flex flex-col items-center space-x-2">
                            <span
                                className="font-light text-gray-500">Deadline: {moment(props.requirement.decisionDate).format("DD.MM")}</span>
                        </div>

                        <div className={"flex justify-center gap-2"}>
                            <div
                                className="font-semibold text-sm inline-flex items-center justify-center px-3 py-1.5 rounded leading-5 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2 hover:bg-indigo-100 text-indigo-500 cursor-pointer">
                                Show options
                            </div>
                        </div>

                        <EditMenu items={[
                            {
                                icon: "edit", action: () => {
                                    navigate(`${props.requirement.id}`)
                                }
                            },
                            {
                                icon: "delete", action: () => {
                                    setDeleteDialog(true)
                                }
                            }
                        ]}/>
                        {deleteDialog ?
                            <ConfirmDialog title={"Delete requirement"}
                                           text={"Do you really want to delete this requirement?"}
                                           acceptText={"Delete"}
                                           cancelText={"Cancel"}
                                           acceptAction={async () => {
                                               await deleteEvent(props.requirement.id!)
                                           }}
                                           cancelAction={() => setDeleteDialog(false)}/>
                            : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}