import {jsonClone} from '@osiz/utils';
import {SetupStoreId} from '@/enum';

export function resetSetupStore(context) {
  const setupSyntaxIds = Object.values(SetupStoreId);

  if (setupSyntaxIds.includes(context.store.id)) {
    const {$state} = context.store

    const defaultStore = jsonClone($state)

    context.store.$reset = () => {
      context.store.$patch(defaultStore)
    }
  }
}