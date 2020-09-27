import colors from './colors';

export const evoInputDefault = {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
}

export const evoInputDefaultHlf = {
    width: '45%',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#fff'
}

export const evoContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
}

export const evoBlankContainer = {
    ...evoContainer,
    backgroundColor: 'white',
    padding: 25
}

export const evoScrollContainer = {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff'
}

export const evoCommonHeading = {
    fontFamily: 'Lobster-Regular',
    fontSize: 26,
    color: colors.primary,
    marginBottom: 10
}

export const evoDefaultBtn = {
    width: '100%',
    padding: 5,
    marginTop: 15
}