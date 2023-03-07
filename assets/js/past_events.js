const past_events = getConditionalEvents(data, -1)
const categorys = getCategorys(past_events)

cardInserter(past_events)
categoryInserter(categorys)