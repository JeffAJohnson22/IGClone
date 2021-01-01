      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
   
   <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <Image
          source={images.logoBlack}
          style={{height: 70, resizeMode: 'contain'}}
        />
      </View>
      <View style={Styles.userNameContainer}>
        <TextInput
          style={Styles.userNameInput}
          placeholder="Telefon numarası, kullanıcı adı veya e-posta"
        />
      </View>
      <View style={Styles.passwordContainer}>
        <TextInput style={Styles.passwordInput} placeholder="Şifre" />
      </View>
      <View style={Styles.forgotPasswordContainer}>
        <TouchableOpacity>
          <Text style={Styles.forgotPasswordText}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={Styles.loginContainer}
        onPress={() => _signInAsync}>
        <Text style={Styles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>