const upcoming_events = getConditionalEvents(data, 1)
const categorys = getCategorys(upcoming_events)

cardInserter(upcoming_events);
categoryInserter(categorys);