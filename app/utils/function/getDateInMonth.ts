export const getDateInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const firstWeekDay = (date.getDate() + 6 )% 7;
    const numberOfEmptyDays = Array(firstWeekDay).fill(null);
    const days = [...numberOfEmptyDays];
    while (date.getMonth() == month) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
    }
    return days;
}
