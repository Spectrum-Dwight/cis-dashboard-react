import { useEffect } from 'react';

function constructQueryParams(accountId: number, kpiType: string): string {
    const encodedAccountId = encodeURIComponent(accountId.toString());
    const encodedKpiType = encodeURIComponent(kpiType);
    const queryParams = `?accountId=${encodedAccountId}&kpiType=${encodedKpiType}`;
    return queryParams;
}

function useKpiEventHandlers(selectedAccountId: number) {
    useEffect(() => {
        function onKpiClick(kpiType: string) {
            const queryString = constructQueryParams(selectedAccountId, kpiType);
            window.location.href = `/maincontainer.aspx${queryString}`;
        }

        function handlePriorYearClick() {
            onKpiClick("prioryear");
        }

        function handleCurrentYearClick() {
            onKpiClick("currentyear");
        }

        function handleClosedQuarterClick() {
            onKpiClick("closedthisquarter");
        }

        function handleInLitigationClick() {
            onKpiClick("inlitigation");
        }

        function addKpiEventListeners() {
            const priorYearCard = document.getElementById("PriorYearCard");
            const currentYearCard = document.getElementById("CurrentYearCard");
            const closedQuarterCard = document.getElementById("ClosedThisQuarterCard");
            const inLitigationCard = document.getElementById("InLitigationCard");

            if (priorYearCard) {
                priorYearCard.removeEventListener("click", handlePriorYearClick);
                priorYearCard.addEventListener("click", handlePriorYearClick);
            }

            if (currentYearCard) {
                currentYearCard.removeEventListener("click", handleCurrentYearClick);
                currentYearCard.addEventListener("click", handleCurrentYearClick);
            }

            if (closedQuarterCard) {
                closedQuarterCard.removeEventListener("click", handleClosedQuarterClick);
                closedQuarterCard.addEventListener("click", handleClosedQuarterClick);
            }

            if (inLitigationCard) {
                inLitigationCard.removeEventListener("click", handleInLitigationClick);
                inLitigationCard.addEventListener("click", handleInLitigationClick);
            }
        }

        addKpiEventListeners();

        return () => {
            const priorYearCard = document.getElementById("PriorYearCard");
            const currentYearCard = document.getElementById("CurrentYearCard");
            const closedQuarterCard = document.getElementById("ClosedThisQuarterCard");
            const inLitigationCard = document.getElementById("InLitigationCard");

            if (priorYearCard) {
                priorYearCard.removeEventListener("click", handlePriorYearClick);
            }

            if (currentYearCard) {
                currentYearCard.removeEventListener("click", handleCurrentYearClick);
            }

            if (closedQuarterCard) {
                closedQuarterCard.removeEventListener("click", handleClosedQuarterClick);
            }

            if (inLitigationCard) {
                inLitigationCard.removeEventListener("click", handleInLitigationClick);
            }
        };
    }, [selectedAccountId]);
}

export default useKpiEventHandlers;